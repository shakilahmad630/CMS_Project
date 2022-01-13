package com.vivatech.controller.cms;

import com.vivatech.model.cms.Usersinroles;
import com.vivatech.repository.cms.UsersinrolesRepository;

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
@RequestMapping(path="/userinroles") // This means URL's start with /demo (after Application path)
public class UsersinrolesController {
	@Autowired // This means to get the bean called userRepository
			   // Which is auto-generated by Spring, we will use it to handle the data
	private UsersinrolesRepository usersinrolesRepository;

	@PostMapping(path="/add") // Map ONLY POST Requests
	public @ResponseBody String addNewUsersinroles (@RequestBody Usersinroles in) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

        // Usersinroles n = new Usersinroles();
        // n.setUserid(in.getUserid());
        // n.setRoleid(in.getRoleid());

		// usersinrolesRepository.save(n);
		return "Saved";
	}

	@GetMapping(path="/all")
	public @ResponseBody Iterable<Usersinroles> getAllUsersinroles() {
		// This returns a JSON or XML with the users
		return usersinrolesRepository.findAll();
	}
}
