package com.movie.Gemflix.dto.movie;

import lombok.*;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FilmographyList {
    private Long pgId;
    private String imgUrl;
    private String title;
}
