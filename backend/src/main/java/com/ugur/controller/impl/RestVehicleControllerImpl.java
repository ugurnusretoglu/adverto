package com.ugur.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ugur.controller.IRestVehicleController;
import com.ugur.controller.RestBaseController;
import com.ugur.controller.RootEntity;
import com.ugur.dto.DtoEngineUI;
import com.ugur.dto.DtoFuelConsumptionIU;
import com.ugur.dto.DtoVehicle;
import com.ugur.dto.DtoVehicleIU;
import com.ugur.service.IVehicleService;

@RestController
@RequestMapping("/rest/api/vehicle")
public class RestVehicleControllerImpl extends RestBaseController implements IRestVehicleController {
	
	@Autowired
	private IVehicleService iVehicleService;
	
	@PostMapping("/save")
	@Override
	public RootEntity<DtoVehicle> saveVehicle(@RequestPart("vehicle") DtoVehicleIU dtoVehicleIU, 
			@RequestPart("images") List<MultipartFile> files) {
		return ok(iVehicleService.saveVehicle(dtoVehicleIU, files));
	}
	
	@PostMapping("/{id}/engine")
	@Override
	public RootEntity<DtoVehicle> saveEngine(@PathVariable(name = "id") Long vehicleId, 
			@RequestBody DtoEngineUI dtoEngineUI) {
		return ok(iVehicleService.saveEngine(vehicleId, dtoEngineUI));
	}
	
	@PostMapping("{id}/fuel")
	@Override
	public RootEntity<DtoVehicle> saveFuelConsumption(@PathVariable(name = "id") Long vehicleId, 
			@RequestBody DtoFuelConsumptionIU dtoFuelConsumptionIU) {
		return ok(iVehicleService.saveFuelConsumption(vehicleId, dtoFuelConsumptionIU));
	}
	
	@GetMapping("/{id}")
	@Override
	public RootEntity<DtoVehicle> getVehicleById(@PathVariable Long id) {
		return ok(iVehicleService.getVehicleById(id));
	}
}
