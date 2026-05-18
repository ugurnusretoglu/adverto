package com.ugur.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoEngineUI;
import com.ugur.dto.DtoFuelConsumptionIU;
import com.ugur.dto.DtoVehicle;
import com.ugur.dto.DtoVehicleIU;

public interface IVehicleService {
	
	public DtoVehicle saveVehicle(DtoVehicleIU dtoVehicleIU, List<MultipartFile> files);
	
	public DtoVehicle saveEngine(Long vehicleId, DtoEngineUI dtoEngineUI);
	
	public DtoVehicle saveFuelConsumption(Long vehicleId, DtoFuelConsumptionIU dtoFuelConsumptionIU);
}
