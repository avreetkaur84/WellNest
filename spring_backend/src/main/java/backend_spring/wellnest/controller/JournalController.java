package backend_spring.wellnest.controller;

import backend_spring.wellnest.model.JournalEntry;
import backend_spring.wellnest.model.User;
import backend_spring.wellnest.repository.UserRepository;
import backend_spring.wellnest.service.JournalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173") // your frontend
@RestController
@RequestMapping("/api/journals")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @Autowired
    private UserRepository userRepository;

    // Create a new journal entry
    @PostMapping
    public ResponseEntity<?> createJournal(@RequestParam Long userId, @RequestBody JournalEntry request) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID");
        }

        User user = optionalUser.get();
        JournalEntry created = journalService.createEntry(
                user,
                request.getTitle(),
                request.getContent(),
                request.getMoodEmoji(),
                request.getMoodLabel(),
                request.getEntryDate() != null ? request.getEntryDate() : LocalDate.now()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Get all entries for a user
    @GetMapping
    public ResponseEntity<?> getUserJournals(@RequestParam Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID");
        }

        List<JournalEntry> entries = journalService.getUserEntries(optionalUser.get());
        return ResponseEntity.ok(entries);
    }

    // Update a journal entry
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJournal(@PathVariable UUID id, @RequestParam Long userId, @RequestBody JournalEntry request) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID");
        }

        try {
            JournalEntry updated = journalService.updateEntry(
                    optionalUser.get(),
                    id,
                    request.getTitle(),
                    request.getContent(),
                    request.getMoodEmoji(),
                    request.getMoodLabel(),
                    request.getEntryDate()
            );
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Delete a journal entry
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJournal(@PathVariable UUID id, @RequestParam Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID");
        }

        try {
            journalService.deleteEntry(optionalUser.get(), id);
            return ResponseEntity.ok("Entry deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}