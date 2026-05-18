package com.ugur.controller;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoEngineUI;
import com.ugur.dto.DtoFuelConsumptionIU;
import com.ugur.dto.DtoVehicle;
import com.ugur.dto.DtoVehicleIU;

public interface IRestVehicleController {
	
	public RootEntity<DtoVehicle> saveVehicle(DtoVehicleIU dtoVehicleIU, List<MultipartFile> files);
	
	public RootEntity<DtoVehicle> saveEngine(Long vehicleId, DtoEngineUI dtoEngineUI);
	
	public RootEntity<DtoVehicle> saveFuelConsumption(Long vehicleId, DtoFuelConsumptionIU dtoFuelConsumptionIU);
}
