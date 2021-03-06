package com.vivatech.controller.cms;

import com.vivatech.model.cms.Usersmapping;
import com.vivatech.repository.cms.UsersmappingRepository;

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
@RequestMapping(path="/cptenantusers") // This means URL's start with /demo (after Application path)
public class UsersmappingController {
	@Autowired // This means to get the bean called userRepository
			   // Which is auto-generated by Spring, we will use it to handle the data
	private UsersmappingRepository usersmappingRepository;

	@PostMapping(path="/add") // Map ONLY POST Requests
	public @ResponseBody String addNewCp_tenant_users (@RequestBody Usersmapping in) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

        // Usersmapping n = new Usersmapping();
        // n.setPuserid(in.getPuserid());
        // n.setUserid(in.getUserid());


        // usersmappingRepository.save(n);
		return "Saved";
	}

	@GetMapping(path="/all")
	public @ResponseBody Iterable<Usersmapping> getAllCptenantusers() {
		// This returns a JSON or XML with the users
		return usersmappingRepository.findAll();
	}
}
