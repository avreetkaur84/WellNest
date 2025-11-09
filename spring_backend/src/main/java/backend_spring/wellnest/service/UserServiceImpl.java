package backend_spring.wellnest.service;

import backend_spring.wellnest.dto.LoginRequest;
import backend_spring.wellnest.dto.SignupRequest;
import backend_spring.wellnest.model.Role;
import backend_spring.wellnest.model.StoragePreference;
import backend_spring.wellnest.model.User;
import backend_spring.wellnest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User signup(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered!");
        }

        // Check if passwords match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match!");
        }

        // Create and save user
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Plain text for now

        // Parse storage preference (default: CLOUD_SYNC)
        StoragePreference preference;
        try {
            preference = StoragePreference.valueOf(
                    request.getStoragePreference() != null
                            ? request.getStoragePreference().toUpperCase()
                            : "CLOUD_SYNC"
            );
        } catch (IllegalArgumentException e) {
            preference = StoragePreference.CLOUD_SYNC;
        }
        user.setStoragePreference(preference);
        user.setRole(Role.USER);

        return userRepository.save(user);
    }

    @Override
    public User login(LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Invalid email or password!");
        }

        User user = optionalUser.get();

        // Simple plain-text password check
        if (!request.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid email or password!");
        }

        return user;
    }
}
