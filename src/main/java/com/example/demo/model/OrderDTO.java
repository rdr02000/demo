package com.example.demo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Order", description = "Order payload used by the API")
public class OrderDTO {
    @Schema(description = "Order id", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Order name", example = "Office chair")
    private String name;

    @Schema(description = "Order price", example = "149.99")
    private Double price;

    public OrderDTO(String name, Double price) {
        this.name = name;
        this.price = price;
    }
}



