package com.movie.Gemflix.dto.movie;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.movie.Gemflix.entity.Ticket;
import lombok.*;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private String content;

    private Long mvId;

    private float score;

    private Long rvId;

    @JsonBackReference
    private TicketDto ticket;

    private String delStatus;

}
