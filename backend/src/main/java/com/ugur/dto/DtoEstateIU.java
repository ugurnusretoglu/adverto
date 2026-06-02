package com.ugur.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoEstateIU extends DtoAdvertIU {
	@NotNull
	DtoAddress dtoAddress;
}