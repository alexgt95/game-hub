# Esquema de IGDB (endpoints que usa este proyecto)

Generado desde https://api-docs.igdb.com/. Cada endpoint equivale a una tabla y
cada fila a una columna. Las marcadas con `->` son relaciones: sin la notacion
con punto llegan como IDs numericos.

| Endpoint | Se usa en |
| --- | --- |
| `games` | `server/igdb.ts` (consulta principal) |
| `covers` | expandido como `cover.image_id` |
| `platforms` | expandido como `platforms.*` |
| `platform_families` | copiado a mano en `src/services/platforms.ts` |

## `/v4/games`

| campo | tipo | notas |
| --- | --- | --- |
| `age_ratings` | Array of Age Rating IDs | `->` The PEGI rating |
| `aggregated_rating` | Double | Rating based on external critic scores |
| `aggregated_rating_count` | Integer | Number of external critic scores |
| `alternative_names` | Array of Alternative Name IDs | `->` Alternative names for this game |
| `artworks` | Array of Artwork IDs | `->` Artworks of this game |
| `bundles` | Array of Game IDs | `->` The bundles this game is a part of |
| `category` | Category Enum | DEPRECATED! Use`game_type` instead |
| `checksum` | uuid | Hash of the object |
| `collection` | Reference ID for Collection | `->` DEPRECATED! Use`collections` instead |
| `collections` | Array of Collection IDs | `->` The collections that this game is in. |
| `cover` | Reference ID for Cover | `->` The cover of this game |
| `created_at` | datetime | Date this was initially added to the IGDB database |
| `dlcs` | Array of Game IDs | `->` DLCs for this game |
| `expanded_games` | Array of Game IDs | `->` Expanded games of this game |
| `expansions` | Array of Game IDs | `->` Expansions of this game |
| `external_games` | Array of External Game IDs | `->` External IDs this game has on other services |
| `first_release_date` | Unix Time Stamp | The first release date for this game |
| `follows` | Integer | DEPRECATED! - To be removed |
| `forks` | Array of Game IDs | `->` Forks of this game |
| `franchise` | Reference ID for Franchise | `->` The main franchise |
| `franchises` | Array of Franchise IDs | `->` Other franchises the game belongs to |
| `game_engines` | Array of Game Engine IDs | `->` The game engine used in this game |
| `game_localizations` | Array of Game Localization IDs | `->` Supported game localizations for this game. A region can have at most one game localization for a given game |
| `game_modes` | Array of Game Mode IDs | `->` Modes of gameplay |
| `game_status` | Reference ID for Game Status | `->` The status of the games release |
| `game_type` | Reference ID for Game Type | `->` The type of game |
| `genres` | Array of Genre IDs | `->` Genres of the game |
| `hypes` | Integer | Number of follows a game gets before release |
| `involved_companies` | Array of Involved Company IDs | `->` Companies who developed this game |
| `keywords` | Array of Keyword IDs | `->` Associated keywords |
| `language_supports` | Array of Language Support IDs | `->` Supported Languages for this game |
| `multiplayer_modes` | Array of Multiplayer Mode IDs | `->` Multiplayer modes for this game |
| `name` | String |  |
| `parent_game` | Reference ID for Game | `->` If a DLC, expansion or part of a bundle, this is the main game or bundle |
| `platforms` | Array of Platform IDs | `->` Platforms this game was released on |
| `player_perspectives` | Array of Player Perspective IDs | `->` The main perspective of the player |
| `ports` | Array of Game IDs | `->` Ports of this game |
| `rating` | Double | Average IGDB user rating |
| `rating_count` | Integer | Total number of IGDB user ratings |
| `release_dates` | Array of Release Date IDs | `->` Release dates of this game |
| `remakes` | Array of Game IDs | `->` Remakes of this game |
| `remasters` | Array of Game IDs | `->` Remasters of this game |
| `screenshots` | Array of Screenshot IDs | `->` Screenshots of this game |
| `similar_games` | Array of Game IDs | `->` Similar games |
| `slug` | String | A url-safe, unique, lower-case version of the name |
| `standalone_expansions` | Array of Game IDs | `->` Standalone expansions of this game |
| `status` | Status Enum | DEPRECATED! Use`game_status` instead |
| `storyline` | String | A short description of a games story |
| `summary` | String | A description of the game |
| `tags` | Array of Tag Numbers | Related entities in the IGDB API |
| `themes` | Array of Theme IDs | `->` Themes of the game |
| `total_rating` | Double | Average rating based on both IGDB user and external critic scores |
| `total_rating_count` | Integer | Total number of user and external critic scores |
| `updated_at` | datetime | The last date this entry was updated in the IGDB database |
| `url` | String | The website address (URL) of the item |
| `version_parent` | Reference ID for Game | `->` If a version, this is the main game |
| `version_title` | String | Title of this version (i.e Gold edition) |
| `videos` | Array of Game Video IDs | `->` Videos of this game |
| `websites` | Array of Website IDs | `->` Websites associated with this game |

## `/v4/covers`

| campo | tipo | notas |
| --- | --- | --- |
| `alpha_channel` | boolean |  |
| `animated` | boolean |  |
| `checksum` | uuid | Hash of the object |
| `game` | Reference ID for Game | `->` The game this cover is associated with. If it is empty then this cover belongs to a game_localization, which can be found under game_localization field |
| `game_localization` | Reference ID for Game Localization | `->` The game localization this cover might be associated with |
| `height` | Integer | The height of the image in pixels |
| `image_id` | String | The ID of the image used to construct an IGDB image link |
| `image_type` | Reference ID for Image Type | `->` The image type categorizing this cover |
| `url` | String | The website address (URL) of the item |
| `width` | Integer | The width of the image in pixels |

## `/v4/platforms`

| campo | tipo | notas |
| --- | --- | --- |
| `abbreviation` | String | An abbreviation of the platform name |
| `alternative_name` | String | An alternative name for the platform |
| `category` | Category Enum | DEPRECATED! Use`platform_type` instead |
| `checksum` | uuid | Hash of the object |
| `created_at` | datetime | Date this was initially added to the IGDB database |
| `generation` | Integer | The generation of the platform |
| `name` | String | The name of the platform |
| `platform_family` | Reference ID for Platform Family | `->` The family of platforms this one belongs to |
| `platform_logo` | Reference ID for Platform Logo | `->` The logo of the first Version of this platform |
| `platform_type` | Reference ID for Platform Type | `->` The type of the platform |
| `slug` | String | A url-safe, unique, lower-case version of the name |
| `summary` | String | The summary of the first Version of this platform |
| `updated_at` | datetime | The last date this entry was updated in the IGDB database |
| `url` | String | The website address (URL) of the item |
| `versions` | Array of Platform Version IDs | `->` Associated versions of this platform |
| `websites` | Array of Platform Website IDs | `->` The main website |

## `/v4/platform_families`

| campo | tipo | notas |
| --- | --- | --- |
| `checksum` | uuid | Hash of the object |
| `name` | String | The name of the platform family |
| `slug` | String | A url-safe, unique, lower-case version of the name |

## `/v4/genres`

| campo | tipo | notas |
| --- | --- | --- |
| `checksum` | uuid | Hash of the object |
| `created_at` | datetime | Date this was initially added to the IGDB database |
| `name` | String |  |
| `slug` | String | A url-safe, unique, lower-case version of the name |
| `updated_at` | datetime | The last date this entry was updated in the IGDB database |
| `url` | String | The website address (URL) of the item |

## `/v4/screenshots`

| campo | tipo | notas |
| --- | --- | --- |
| `alpha_channel` | boolean |  |
| `animated` | boolean |  |
| `checksum` | uuid | Hash of the object |
| `game` | Reference ID for Game | `->` The game this video is associated with |
| `height` | Integer | The height of the image in pixels |
| `image_id` | String | The ID of the image used to construct an IGDB image link |
| `url` | String | The website address (URL) of the item |
| `width` | Integer | The width of the image in pixels |

## `/v4/involved_companies`

| campo | tipo | notas |
| --- | --- | --- |
| `checksum` | uuid | Hash of the object |
| `company` | Reference ID for Company | `->` |
| `created_at` | datetime | Date this was initially added to the IGDB database |
| `developer` | boolean |  |
| `game` | Reference ID for Game | `->` |
| `porting` | boolean |  |
| `publisher` | boolean |  |
| `supporting` | boolean |  |
| `updated_at` | datetime | The last date this entry was updated in the IGDB database |

## `/v4/companies`

| campo | tipo | notas |
| --- | --- | --- |
| `change_date` | Unix Time Stamp | The data when a company got a new ID |
| `change_date_category` | Change Date Category Enum | DEPRECATED! Use`change_date_format` instead |
| `change_date_format` | Reference ID for Date Format | `->` The format of the change date |
| `changed_company_id` | Reference ID for Company | `->` The new ID for a company that has gone through a merger or restructuring |
| `checksum` | uuid | Hash of the object |
| `company_size` | Reference ID for Company Size | `->` The size of the company |
| `company_type_histories` | Array of Company Type History IDs | `->` The history of company types |
| `country` | Integer | ISO 3166-1 country code |
| `created_at` | datetime | Date this was initially added to the IGDB database |
| `description` | String | A free text description of a company |
| `developed` | Array of Game IDs | `->` An array of games that a company has developed |
| `logo` | Reference ID for Company Logo | `->` The company’s logo |
| `name` | String |  |
| `parent` | Reference ID for Company | `->` A company with a controlling interest in a specific company |
| `published` | Array of Game IDs | `->` An array of games that a company has published |
| `slug` | String | A url-safe, unique, lower-case version of the name |
| `start_date` | Unix Time Stamp | The date a company was founded |
| `start_date_category` | Start Date Category Enum | DEPRECATED! Use`start_date_format` instead |
| `start_date_format` | Reference ID for Date Format | `->` The format of the start date |
| `status` | Reference ID for Company Status | `->` The status of the company |
| `updated_at` | datetime | The last date this entry was updated in the IGDB database |
| `url` | String | The website address (URL) of the item |
| `websites` | Array of Company Website IDs | `->` The companies official websites |
