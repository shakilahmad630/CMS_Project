package com.vivatech.controller.cms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;
import com.vivatech.service.JwtUserDetailsService;

import com.vivatech.config.JwtTokenUtil;
import com.vivatech.config.Response;
import com.vivatech.model.cms.Usersmapping;
import com.vivatech.model.cms.JwtRequest;
import com.vivatech.model.cms.JwtResponse;
import com.vivatech.model.cms.UserDTO;
import com.vivatech.model.cms.UserinrolesIdentity;
import com.vivatech.model.cms.UsermappingIdentity;
import com.vivatech.model.cms.Users;
import com.vivatech.model.cms.Usersinroles;
import com.vivatech.repository.cms.UsersRepository;
import com.vivatech.repository.cms.UsersinrolesRepository;
import com.vivatech.repository.cms.UsersmappingRepository;
import com.vivatech.repository.cms.RolesRepository;
import com.vivatech.repository.cms.UserassignrolesRepository;
import com.vivatech.repository.cms.UsercontentsRepository;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@CrossOrigin
@RequestMapping(path = "/users")
public class UsersController {

	private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @Autowired
  private JwtUserDetailsService userDetailsService;

  @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
  public @ResponseBody JwtResponse createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

    JwtResponse response;
    try {
      authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

      final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

      final String token = jwtTokenUtil.generateToken(userDetails);

      UserDTO userdto = getCurrentUserDTO(authenticationRequest.getUsername());
      response =  new JwtResponse(token, userdto, "");

    } catch (Exception e) {
      //TODO: handle exception
      response =  new JwtResponse("", null, e.getMessage());
      logger.error("createAuthenticationToken : " + e.getMessage());
    }

    return response;
  }

  UserDTO getCurrentUserDTO(String username)
  {
    List<Object[]> objlist = usersRepository.getUserAndRoleDetailsFromUsername(username);

    UserDTO oUserDTO = new UserDTO();
    if(objlist != null)
    {
      Object[] obj = objlist.get(0);
      oUserDTO.setId((String) obj[0]);
      oUserDTO.setUsername((String) obj[1]);
      oUserDTO.setPassword((String) obj[2]);
      oUserDTO.setFirstname((String) obj[3]);
      oUserDTO.setLastname((String) obj[4]);
      oUserDTO.setEmail((String) obj[5]);
      oUserDTO.setPhonenumber((String) obj[6]);
      oUserDTO.setStatus((String) obj[7]);
      oUserDTO.setRolename((String) obj[8]);
    }

    return oUserDTO;
  }

  // @RequestMapping(value = "/register", method = RequestMethod.POST)
  // public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception
  // {
  // return ResponseEntity.ok(userDetailsService.save(user));
  // }

  private void authenticate(String username, String password) throws Exception {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      throw new Exception("USER_DISABLED", e);
    } catch (BadCredentialsException e) {
      throw new Exception("INVALID_CREDENTIALS", e);
    }
  }
  
    @RequestMapping(value = "/reauthenticate", method = RequestMethod.POST)
    public @ResponseBody
    JwtResponse ReAuthenticationToken() throws Exception 
        {
            JwtResponse response;
            try {
                UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                        .getPrincipal();
                String username = userDetails.getUsername();
                logger.warn(username);
                
                //authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

                //final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

                final String token = jwtTokenUtil.generateToken(userDetails);

                UserDTO userdto = getCurrentUserDTO(username);
                response = new JwtResponse(token, userdto, "");

            } catch (Exception e) {
                //TODO: handle exception
                response = new JwtResponse("", null, e.getMessage());
                logger.error("createAuthenticationToken : " + e.getMessage());
            }
            return response;
        }

  @Autowired // This means to get the bean called userRepository
  // Which is auto-generated by Spring, we will use it to handle the data
  UsercontentsRepository usercontentsRepository;

  @Autowired // This means to get the bean called userRepository
  // Which is auto-generated by Spring, we will use it to handle the data
  UserassignrolesRepository userassignrolesRepository;

  @Autowired // This means to get the bean called userRepository
  // Which is auto-generated by Spring, we will use it to handle the data
  private UsersRepository usersRepository;

  @Autowired // This means to get the bean called usersinrolesRepository
  // Which is auto-generated by Spring, we will use it to handle the data
  private UsersinrolesRepository usersinrolesRepository;

  @Autowired // This means to get the bean called usersinrolesRepository
  // Which is auto-generated by Spring, we will use it to handle the data
  private RolesRepository rolesRepository;

  @Autowired // This means to get the bean called usersinrolesRepository
  // Which is auto-generated by Spring, we will use it to handle the data
  private UsersmappingRepository usermappingRepository;

  @Autowired
  private PasswordEncoder bcryptEncoder;

  @PostMapping(path = "/add") // Map ONLY POST Requests
  public @ResponseBody Response addNewUsers(@RequestBody UserDTO in) {
    // @ResponseBody means the returned String is the response, not a view name
    // @RequestParam means it is a parameter from the GET or POST request
    try {
      // Create new user
      Users n = new Users();
      UUID uuid = UUID.randomUUID();

      n.setId(uuid.toString());// set unique id
      n.setEmail(in.getEmail());
      n.setFirstname(in.getFirstname());
      n.setLastname(in.getLastname());
      n.setPasswordhash(bcryptEncoder.encode(in.getPassword()));
      n.setPhonenumber(in.getPhonenumber());
      n.setUsername(in.getUsername());
      n.setStatus(in.getStatus());

      // get current max cpid value.
      // logger.error("rolename : " + in.getRolename());
      if (in.getRolename().equalsIgnoreCase("CPTENANT")) {
        n.setCpid(getNextCPIDValue());

      }

      usersRepository.save(n);
      // End

      // assign user the given role

      UserinrolesIdentity userinroleIdentity = new UserinrolesIdentity(uuid.toString(), getRoleIDFromRolename(in.getRolename()));
      Usersinroles oUserinroles = new Usersinroles(userinroleIdentity);
      //oUserinroles.setUserid(uuid.toString());
      //oUserinroles.setRoleid(getRoleIDFromRolename(in.getRolename()));
      usersinrolesRepository.save(oUserinroles);
      //

      // Add user relationship
      if (in.getAssociateduserid() != "") {
        UsermappingIdentity usermappingIdentity = new UsermappingIdentity(in.getAssociateduserid(), uuid.toString());
        Usersmapping ousermapping = new Usersmapping(usermappingIdentity);
        // ousermapping.setPuserid(in.getAssociateduserid());
        // ousermapping.setUserid(uuid.toString());
        usermappingRepository.save(ousermapping);
      }
      //

    } catch (Exception e) {
      // TODO: handle exception
      return new Response("", e.getMessage());
    }

    return new Response("SUCCESS", "");
  }

  // @GetMapping(path = "/all")
  // public @ResponseBody Iterable<Users> getAllUsers() {
  //   // This returns a JSON or XML with the users
  //   return usersRepository.findAll();
  // }

  @PostMapping(path = "/view")
  public @ResponseBody Iterable<UserDTO> getAllUsersAttached(@RequestBody String pUserId) {
    // This returns a JSON or XML with the users
    List<UserDTO> userlist = new ArrayList<UserDTO>();
    try {
        //Fetch Rolename of the user
        String rolename = usersRepository.getrolenameforUserid(pUserId);  
        
        List<Object[]> objectlist = new ArrayList<Object[]>();
        List<Object[]> currUserobjectlist = new ArrayList<Object[]>();
        currUserobjectlist = usersRepository.findByUserid(pUserId);
        
        if(rolename.equalsIgnoreCase("ADMIN"))
        { //Admin User : Return all users in system    
            objectlist = usersRepository.findAllUsers();
            //remove admin user
            Iterator<Object[]> itr = objectlist.iterator();
            while (itr.hasNext())
            {
                    Object[] obj = itr.next();
                    String userid = (String) obj[0];
                    if (userid.equalsIgnoreCase(pUserId)) {
                            itr.remove();
                    }
            }
            //

            objectlist.addAll(0, currUserobjectlist);
        }
        else if(rolename.equalsIgnoreCase("CPTENANT"))
        {//CPTenant Useer : Return only assosciated users.            
            objectlist = usersRepository.findByPUserid(pUserId);
            objectlist.addAll(0, currUserobjectlist);            
        }
        else if(rolename.equalsIgnoreCase("CPUSER"))
        {
            objectlist.addAll(0, currUserobjectlist);
        }
        for (Object[] obj : objectlist) {
              UserDTO oUserDTO = new UserDTO();
              oUserDTO.setId((String) obj[0]);
              oUserDTO.setUsername((String) obj[1]);
              oUserDTO.setPassword((String) obj[2]);
              oUserDTO.setFirstname((String) obj[3]);
              oUserDTO.setLastname((String) obj[4]);
              oUserDTO.setEmail((String) obj[5]);
              oUserDTO.setPhonenumber((String) obj[6]);
              oUserDTO.setStatus((String) obj[7]);
              oUserDTO.setRolename((String) obj[8]);

              userlist.add(oUserDTO);
            }

    } catch (Exception e) {
      // TODO: handle exception
      logger.info("getAllUsersAttached : " + e.getMessage());
    }

    return userlist;
  }

  private String getNextCPIDValue() {
    String currentMaxCPIDValue = usersRepository.getMaxCPIDValue();

    Integer nextvalue = Integer.parseInt(currentMaxCPIDValue);
    nextvalue++;

    String nextvalueString = nextvalue.toString();
    if (nextvalueString.length() == 1) {
      nextvalueString = "00" + nextvalueString;
    } else if (nextvalueString.length() == 2) {
      nextvalueString = "0" + nextvalueString;
    }
    return nextvalueString;
  }

  private String getRoleIDFromRolename(String rolename) {
    return rolesRepository.getRoleIDFromRoleName(rolename.toLowerCase());
  }

  @PostMapping(path = "/update") // Map ONLY POST Requests
  public @ResponseBody Response updateUsers(@RequestBody UserDTO in) {
    // @ResponseBody means the returned String is the response, not a view name
    // @RequestBody means it is a parameter from the GET or POST request

    try {
      Users n = usersRepository.findByUsername(in.getUsername());

      n.setEmail(in.getEmail());
      n.setFirstname(in.getFirstname());
      n.setLastname(in.getLastname());
      if(n.getPasswordhash().equalsIgnoreCase(in.getPassword()))
      {//update only if password field is changed
        n.setPasswordhash(bcryptEncoder.encode(in.getPassword()));
      }

      n.setPhonenumber(in.getPhonenumber());
      n.setStatus(in.getStatus());

      // TO DO : role name
      // TO DO :associated userid

      usersRepository.save(n);

    } catch (Exception e) {
      //TODO: handle exception
      return new Response("", e.getMessage());
    }

    return new Response("SUCCESS", "");
  }

  @PostMapping(path = "/delete") // Map ONLY POST Requests
  @Transactional
  public @ResponseBody Response deleteUsers(@RequestBody String userid) {

    try {
        // usermapping
    usermappingRepository.deleteAll(usermappingRepository.findByUsermappingIdentityUserid(userid));

    // usercontents
    //TODO : not deleting contents and contentproperties for this user.
    usercontentsRepository.deleteAll(usercontentsRepository.findByUsercontentsIdentityUserid(userid));

    // userinroles
    usersinrolesRepository.deleteAll(usersinrolesRepository.findByUserinrolesIdentityUserid(userid));

    // userassignedroles
    userassignrolesRepository.deleteAll(userassignrolesRepository.findByUserassignrolesIdentityUserid(userid));

    // users
    usersRepository.deleteById(userid);

    } catch (Exception e) {
      //TODO: handle exception
      return new Response("", e.getMessage());
    }


    return new Response("SUCCESS", "");
  }

}
