package com.ugur.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ugur.dto.DtoEngine;
import com.ugur.dto.DtoEngineUI;
import com.ugur.dto.DtoFuelConsumption;
import com.ugur.dto.DtoFuelConsumptionIU;
import com.ugur.dto.DtoImage;
import com.ugur.dto.DtoVehicle;
import com.ugur.dto.DtoVehicleIU;
import com.ugur.exception.BaseException;
import com.ugur.exception.ErrorMessage;
import com.ugur.exception.MessageType;
import com.ugur.model.Engine;
import com.ugur.model.FuelConsumption;
import com.ugur.model.Image;
import com.ugur.model.Vehicle;
import com.ugur.repository.EngineRepository;
import com.ugur.repository.FuelConsumptionRepository;
import com.ugur.repository.VehicleRepository;
import com.ugur.service.IVehicleService;

@Service
public class VehicleServiceImpl implements IVehicleService {
	
	@Autowired
	private VehicleRepository vehicleRepository;
	
	@Autowired
	private AdvertServiceImpl advertServiceImpl;
	
	@Autowired
	private EngineRepository engineRepository;
	
	@Autowired
	private FuelConsumptionRepository fuelConsumptionRepository;
	
	public Vehicle createVehicle(DtoVehicleIU dtoVehicleIU) {
		Vehicle vehicle = new Vehicle();
		BeanUtils.copyProperties(dtoVehicleIU, vehicle);
		vehicle.setUser(advertServiceImpl.getCurrentUser());
		vehicle.setCreatedAt(new Date());
		
		return vehicle;
	}
	
	@Override
	public DtoVehicle saveVehicle(DtoVehicleIU dtoVehicleIU, List<MultipartFile> files) {
		DtoVehicle dtoVehicle = new DtoVehicle();
		Vehicle savedVehicle = vehicleRepository.save(createVehicle(dtoVehicleIU));
		
		List<Image> images = advertServiceImpl.uploadImages(files, savedVehicle);
		savedVehicle.setImages(images);
		vehicleRepository.save(savedVehicle);
		
		BeanUtils.copyProperties(savedVehicle, dtoVehicle);
		
		List<DtoImage> dtoImages = images.stream().map(image -> {
			DtoImage dtoImage = new DtoImage();
			BeanUtils.copyProperties(image, dtoImage);
			return dtoImage;
		}).toList();
		dtoVehicle.setImages(dtoImages);;
	
		return dtoVehicle;
	}

	@Override
	public DtoVehicle saveEngine(Long vehicleId, DtoEngineUI dtoEngineUI) {
		DtoVehicle dtoVehicle = new DtoVehicle();
		Vehicle vehicle= vehicleRepository.findById(vehicleId)
				.orElseThrow(() -> new BaseException(new ErrorMessage(MessageType.NO_RECORD_EXIST, vehicleId.toString())));
		
		Engine engine = new Engine();
		BeanUtils.copyProperties(dtoEngineUI, engine);
		engine.setCreatedAt(new Date());
		Engine savedEngine = engineRepository.save(engine);
		vehicle.setEngine(savedEngine);
		
		Vehicle savedVehicle = vehicleRepository.save(vehicle);		
		BeanUtils.copyProperties(savedVehicle, dtoVehicle);
		
		if (savedVehicle.getEngine() != null) {
			DtoEngine dtoEngine = new DtoEngine();
			BeanUtils.copyProperties(savedVehicle.getEngine(), dtoEngine);
			dtoVehicle.setEngine(dtoEngine);
		}

		return dtoVehicle;
	}

	@Override
	public DtoVehicle saveFuelConsumption(Long vehicleId, DtoFuelConsumptionIU dtoFuelConsumptionIU) {
		DtoVehicle dtoVehicle = new DtoVehicle();		
		Vehicle vehicle = vehicleRepository.findById(vehicleId)
				.orElseThrow(() -> new BaseException(new ErrorMessage(MessageType.NO_RECORD_EXIST, vehicleId.toString())));
		
		FuelConsumption fuelConsumption = new FuelConsumption();
		BeanUtils.copyProperties(dtoFuelConsumptionIU, fuelConsumption);
		fuelConsumption.setCreatedAt(new Date());
		FuelConsumption savedFuelConsumption = fuelConsumptionRepository.save(fuelConsumption);
		vehicle.setFuelConsumption(savedFuelConsumption);
		
		Vehicle savedVehicle = vehicleRepository.save(vehicle);
		BeanUtils.copyProperties(savedVehicle, dtoVehicle);
		
		if (savedVehicle.getFuelConsumption() != null) {
			DtoFuelConsumption dtoFuelConsumption = new DtoFuelConsumption();
			BeanUtils.copyProperties(savedVehicle.getFuelConsumption(), dtoFuelConsumption);
			dtoVehicle.setFuelConsumption(dtoFuelConsumption);
		}
		
		return dtoVehicle;
	}

	@Override
	public DtoVehicle getVehicleById(Long id) {
		DtoVehicle dtoVehicle = new DtoVehicle();
		
		Vehicle vehicle = vehicleRepository.findById(id)
				.orElseThrow(() -> new BaseException(new ErrorMessage(MessageType.NO_RECORD_EXIST, id.toString())));
		
		BeanUtils.copyProperties(vehicle, dtoVehicle);
		
		if(vehicle.getImages() != null) {
			List<DtoImage> dtoImages = vehicle.getImages().stream().map(image -> {
				DtoImage dtoImage = new DtoImage();
				BeanUtils.copyProperties(image, dtoImage);
				return dtoImage;
			}).toList();
			dtoVehicle.setImages(dtoImages);
		}
		
		if(vehicle.getEngine() != null) {
			DtoEngine dtoEngine = new DtoEngine();
			BeanUtils.copyProperties(vehicle.getEngine(), dtoEngine);
			dtoVehicle.setEngine(dtoEngine);
		}
		
		if(vehicle.getFuelConsumption() != null) {
			DtoFuelConsumption dtoFuelConsumption = new DtoFuelConsumption();
			BeanUtils.copyProperties(vehicle.getFuelConsumption(), dtoFuelConsumption);
			dtoVehicle.setFuelConsumption(dtoFuelConsumption);
		}
		return dtoVehicle;
	}
}
