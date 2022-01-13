package com.vivatech.controller.cms;

import com.vivatech.model.cms.Locations;
import com.vivatech.repository.cms.LocationsRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller	// This means that this class is a Controller
@RequestMapping(path="/locations") // This means URL's start with /demo (after Application path)
public class LocationsController {
	@Autowired // This means to get the bean called locationRepository
			   // Which is auto-generated by Spring, we will use it to handle the data
	private LocationsRepository locationRepository;

	@PostMapping(path="/add") // Map ONLY POST Requests
	public @ResponseBody String addNewLocation (@RequestBody Locations in) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

		Locations n = new Locations();
		n.setId(in.getId());
		n.setName(in.getName());

		locationRepository.save(n);
		return "Saved";
	}

	@GetMapping(path="/all")
	public @ResponseBody Iterable<Locations> getAllLocation() {
		// This returns a JSON or XML with the users
		return locationRepository.findAll();
	}
}
