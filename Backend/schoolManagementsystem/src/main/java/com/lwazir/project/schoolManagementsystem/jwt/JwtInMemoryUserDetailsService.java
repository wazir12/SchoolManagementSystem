package com.lwazir.project.schoolManagementsystem.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lwazir.project.schoolManagementsystem.model.User;
import com.lwazir.project.schoolManagementsystem.repository.UserRepository;


@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {
 
	@Autowired
	UserRepository repo;
	 
	
    List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
	

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	  List<User> users=repo.findAll();
	  for(User user:users) {
			inMemoryUserList.add(new JwtUserDetails(
					user.getId().longValue(),
					user.getName(),
					user.getPassword(),
					user.getRole()
					));
		}
    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
        .filter(user -> user.getUsername().equals(username)).findFirst();

    if (!findFirst.isPresent()) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }

    return findFirst.get();
  }

}