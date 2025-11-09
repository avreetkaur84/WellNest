package backend_spring.wellnest.service;

import backend_spring.wellnest.dto.LoginRequest;
import backend_spring.wellnest.dto.SignupRequest;
import backend_spring.wellnest.model.User;

public interface UserService {
    User signup(SignupRequest request);
    User login(LoginRequest request);
}