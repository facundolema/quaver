package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

type Track struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Duration int    `json:"duration"`
	Artist   string `json:"artist"`
	Album    string `json:"album"`
	Path     string `json:"path"`
	Artwork  string `json:"artwork"`
}

func main() {
	fmt.Println("Starting server on port :8080")
	fs := http.FileServer(http.Dir("audio"))
	http.Handle("/audio/", http.StripPrefix("/audio/", fs))

	coverFs := http.FileServer(http.Dir("cover"))
	http.Handle("/cover/", http.StripPrefix("/cover/", coverFs))

	http.HandleFunc("/playlist", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Requesting playlist")
		db, err := sql.Open("sqlite3", "./database.db")
		if err != nil {
			log.Fatal(err)
		}
		defer db.Close()

		rows, err := db.Query(`
        SELECT track.id, track.title, track.duration, artist.name, album.title, track.path, album.artwork
        FROM track
        INNER JOIN album ON track.album_id = album.id
				INNER JOIN artist ON track.artist_id = artist.id
    `)
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		var tracks []Track
		for rows.Next() {
			var t Track
			err = rows.Scan(&t.ID, &t.Title, &t.Duration, &t.Artist, &t.Album, &t.Path, &t.Artwork)
			if err != nil {
				log.Fatal(err)
			}
			tracks = append(tracks, t)
		}

		err = rows.Err()
		if err != nil {
			log.Fatal(err)
		}

		json.NewEncoder(w).Encode(tracks)
	})

	http.ListenAndServe(":8080", nil)
}
