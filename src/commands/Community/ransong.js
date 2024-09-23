const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  Embed,
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  ActionRowBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const axios = require("axios");

const clientId = "<clientId>";
const clientSecret = "<clientSecret>";

const config = require("../../../config.json");

const authorizedUsers = [...config.beta_testers, ...config.owner];

const commandData = new SlashCommandBuilder()
  .setName("ransong")
  .setDescription(
    "Gives a random song from Spotify (filtered by song, artist, and genre)"
  )
  .addStringOption((option) =>
    option
      .setName("genre")
      .setDescription("The genre the song will be mainly categorised in")
      .setRequired(false)
      .setAutocomplete(true)
  )
  .addStringOption((option) =>
    option
      .setName("artist")
      .setDescription("Recommends song that sound like an artist")
      .setRequired(false)
  )
  .addStringOption((option) =>
    option
      .setName("track")
      .setDescription("Recommends song that sound like a track")
      .setRequired(false)
  )
  .toJSON();

module.exports = {
  data: {
    ...commandData,
    integration_types: [1],
    contexts: [0, 1, 2],
  },

  async autocomplete(interaction) {
    const value = interaction.options.getFocused().toLowerCase();
    let choices = [
      "acoustic",
      "afrobeat",
      "alt-rock",
      "alternative",
      "ambient",
      "anime",
      "black-metal",
      "bluegrass",
      "blues",
      "bossanova",
      "brazil",
      "breakbeat",
      "british",
      "cantopop",
      "chicago-house",
      "children",
      "chill",
      "classical",
      "club",
      "comedy",
      "country",
      "dance",
      "dancehall",
      "death-metal",
      "deep-house",
      "detroit-techno",
      "disco",
      "disney",
      "drum-and-bass",
      "dub",
      "dubstep",
      "edm",
      "electro",
      "electronic",
      "emo",
      "folk",
      "forro",
      "french",
      "funk",
      "garage",
      "german",
      "gospel",
      "goth",
      "grindcore",
      "groove",
      "grunge",
      "guitar",
      "happy",
      "hard-rock",
      "hardcore",
      "hardstyle",
      "heavy-metal",
      "hip-hop",
      "holidays",
      "honky-tonk",
      "house",
      "idm",
      "indian",
      "indie",
      "indie-pop",
      "industrial",
      "iranian",
      "j-dance",
      "j-idol",
      "j-pop",
      "j-rock",
      "jazz",
      "k-pop",
      "kids",
      "latin",
      "latino",
      "malay",
      "mandopop",
      "metal",
      "metal-misc",
      "metalcore",
      "minimal-techno",
      "movies",
      "mpb",
      "new-age",
      "new-release",
      "opera",
      "pagode",
      "party",
      "philippines-opm",
      "piano",
      "pop",
      "pop-film",
      "post-dubstep",
      "power-pop",
      "progressive-house",
      "psych-rock",
      "punk",
      "punk-rock",
      "r-n-b",
      "rainy-day",
      "reggae",
      "reggaeton",
      "road-trip",
      "rock",
      "rock-n-roll",
      "rockabilly",
      "romance",
      "sad",
      "salsa",
      "samba",
      "sertanejo",
      "show-tunes",
      "singer-songwriter",
      "ska",
      "sleep",
      "songwriter",
      "soul",
      "soundtracks",
      "spanish",
      "study",
      "summer",
      "swedish",
      "synth-pop",
      "tango",
      "techno",
      "trance",
      "trip-hop",
      "turkish",
      "work-out",
      "world-music",
    ];

    const filtered = choices
      .filter((choice) => choice.toLowerCase().includes(value))
      .slice(0, 25);

    if (!interaction) return;

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction) {


    await interaction.deferReply();

    let genre = interaction.options?.getString("genre");
    let artistNoId = interaction.options?.getString("artist");
    let trackNoId = interaction.options?.getString("track");
    const limit = interaction.options?.getNumber("limit");

    let accessToken;
    let artistId;
    let trackId;

    // Get access token using client ID and secret
    const tokenEndpoint = "https://accounts.spotify.com/api/token";
    try {
      const tokenResponse = await axios.post(
        tokenEndpoint,
        {
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      accessToken = tokenResponse.data.access_token;

      // Get artist ID
      if (artistNoId)
        try {
          const artistSearchEndpoint = `https://api.spotify.com/v1/search?q=${artistNoId}&type=artist&limit=1`;
          try {
            const artistSearchResponse = await axios.get(artistSearchEndpoint, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            artistId = artistSearchResponse.data.artists.items[0].id;
          } catch (error) {
            console.error("Error occurred:", error);
            await interaction.editReply(
              "An error occurred. Please try again later."
            );
            return;
          }
        } catch (error) {
          console.error("Error occurred:", error);
          await interaction.editReply(
            "An error occurred. Please try again later."
          );
          return;
        }
    } catch (error) {
      console.error("Error occurred:", error);
      await interaction.editReply("An error occurred. Please try again later.");
      return;
    }

    // Get track ID
    // and yes I also c&p this because laziness
    if (trackNoId)
      try {
        const trackSearchEndpoint = `https://api.spotify.com/v1/search?q=${trackNoId}&type=track&limit=1`;
        const trackSearchResponse = await axios.get(trackSearchEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        trackId = trackSearchResponse.data.tracks.items[0].id;
      } catch (error) {
        console.error("Error occurred:", error);
        await interaction.editReply(
          "An error occurred. Please try again later."
        );
        return;
      }

    let endpoint = "";

    if (!genre && !artistNoId && !trackNoId) {
      endpoint = `https://api.spotify.com/v1/recommendations?limit=1&seed_genres=${allSpotifyGenres[Math.floor(Math.random() * allSpotifyGenres.length)]
        }`;
    } else if (genre && !artistNoId && !trackNoId) {
      endpoint = `https://api.spotify.com/v1/recommendations?limit=1&seed_genres=${genre}`; // Recommendation | genre
    } else if (!genre && artistNoId && !trackNoId) {
      endpoint = `https://api.spotify.com/v1/recommendations?limit=1&seed_artists=${artistId}`; // Recommendation | artist
    } else if (genre && artistNoId && !trackNoId) {
      endpoint = `https://api.spotify.com/v1/recommendations?limit=1&seed_artists=${artistId}&seed_genres=${genre}`; // Recommendation | genre & artist
    } else if (!genre && !artistNoId && trackNoId) {
      endpoint = `https://api.spotify.com/v1/recommendations?limit=1&seed_tracks=${trackId}`; // Recommendation | track
    } else if (genre && !artistNoId && trackNoId) {
      endpoint = `https://api.spotify.com/v1/recommendations?limit=1&seed_tracks=${trackId}&seed_genres=${genre}`; // Recommendation | genre & track
    } else if (!genre && artistNoId && trackNoId) {
      endpoint = `https://api.spotify.com/v1/recommendations?limit=1&seed_artists=${artistId}&seed_tracks=${trackId}`; // Recommendation | artist & track
    } else if (genre && artistNoId && trackNoId) {
      endpoint = `https://api.spotify.com/v1/recommendations?limit=1&seed_artists=${artistId}&seed_tracks=${trackId}&seed_genres=${genre}`; // Recommendation | genre & artist & track
    }

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.get(endpoint, options);
      if (response.data.tracks && response.data.tracks.length > 0) {
        const track = response.data.tracks[0];

        const album = {
          id: track.album.id,
          name: track.album.name,
          type: track.album.type,
          releaseDate: track.album.release_date,
          releaseDatePrecision: track.album.release_date_precision,
          totalTracks: track.album.total_tracks,
          availableMarkets: track.album.available_markets,
          externalUrls: track.album.external_urls.spotify,
          href: track.album.href,
          uri: track.album.uri,
        };

        const artist = {
          id: track.artists[0].id,
          name: track.artists[0].name,
          type: track.artists[0].type,
          externalUrls: track.artists[0].external_urls.spotify,
          href: track.artists[0].href,
          uri: track.artists[0].uri,
        };

        const song = {
          id: track.id,
          title: track.name,
          trackUrl: track.external_urls.spotify,
          artist: artist,
          album: album,
          durationMs: track.duration_ms,
          explicit: track.explicit,
          externalIds: track.external_ids,
          isLocal: track.is_local,
          popularity: track.popularity,
          previewUrl: track.preview_url,
          trackNumber: track.track_number,
          type: track.type,
          uri: track.uri,
          image: track.album.images[2].url,
        };

        if (song.explicit === true) {
          let songName = "Song Name (Explicit)";
        } else {
          let songName = "Song Name";
        }

        const embed = new EmbedBuilder()
          .setAuthor({
            name: "<bot name>",
            url: "<author url>",
            iconURL:
              "<iconURL>",
          })
          .setTitle("Song Recommendation")
          .setURL(`${song.trackUrl}`)
          .setDescription("Provided by Spotify")
          .addFields(
            {
              name: " ",
              value: " ",
              inline: false,
            },
            {
              name: "Song Name",
              value: `${song.title} by ${song.artist.name}`,
              inline: false,
            },
            {
              name: " ",
              value: " ",
              inline: false,
            },
            {
              name: "Album",
              value: `${song.album.name}`,
              inline: false,
            },
            {
              name: " ",
              value: " ",
              inline: false,
            },
            {
              name: "Track Information",
              value: `TrackID: ${song.id}\nTrackExplicit: ${song.explicit}\nPopularity: ${song.popularity}\nTrackURI: ${song.uri}`,
              inline: false,
            },
            {
              name: "Album Information",
              value: `AlbumID: ${song.album.id}\nAlbumType: ${song.album.type}\nReleaseDate: ${song.album.releaseDate}\nPresiceReleaseDate: ${song.album.releaseDatePrecision}\nAlbumURI: ${song.album.uri}`,
              inline: false,
            },
            {
              name: "Artist Information",
              value: `ArtistID: ${song.artist.id}\nArtistType: ${song.artist.type}\nArtistHREF: ${song.artist.href}\nArtistURI: ${song.artist.uri}`,
              inline: false,
            }
          )
          .setThumbnail(`${song.image}`);

        const playOnSpotify = new ButtonBuilder()
          .setEmoji("<emoji>")
          .setStyle(ButtonStyle.Link)
          .setURL(song.trackUrl);

        const row = new ActionRowBuilder().addComponents(playOnSpotify);

        await interaction.editReply({
          embeds: [embed],
          components: [row],
        });

        console.log(`
---------------
Command: ransong
Run by: ${interaction.user.username}, ${interaction.user.displayName} | ${interaction.user.id}
Time: ${new Date().toLocaleString()}
Command Response: ${song.title}(${song.trackUrl}) by ${song.artist.name}(${song.artist.externalUrls}) in ${song.album.name}(${song.album.externalUrls}) | (${song.image})
--------------`);
      } else {
        await interaction.editReply(
          "No tracks found. Try again later\n-# Command might not be available due to either Spotify's rate limit or Spotify has blacklisted the IP sending the requests."
        );
      }
    } catch (error) {
      console.error("Error occurred:", error);
      await interaction.editReply("An error occurred. Please try again later.");
    }
  },
};
