package backend_spring.wellnest.repository;

import backend_spring.wellnest.model.JournalEntry;
import backend_spring.wellnest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, UUID> {

    // Get all journal entries for a user
    List<JournalEntry> findByUser(User user);

    // Optional: get entries by date for calendar filtering
    List<JournalEntry> findByUserAndEntryDate(User user, LocalDate entryDate);

    // Optional: search in content
    List<JournalEntry> findByUserAndContentContainingIgnoreCase(User user, String keyword);
}