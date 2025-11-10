package backend_spring.wellnest.service;

import backend_spring.wellnest.model.JournalEntry;
import backend_spring.wellnest.model.User;
import backend_spring.wellnest.repository.JournalEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class JournalService {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    // Create a new journal entry
    public JournalEntry createEntry(User user, String title, String content, String moodEmoji, String moodLabel, LocalDate entryDate) {
        JournalEntry entry = new JournalEntry();
        entry.setUser(user);
        entry.setTitle(title != null ? title : ""); // auto-title logic can be added later
        entry.setContent(content);
        entry.setMoodEmoji(moodEmoji);
        entry.setMoodLabel(moodLabel);
        entry.setEntryDate(entryDate != null ? entryDate : LocalDate.now());
        entry.setWordCount(content.split("\\s+").length);
        return journalEntryRepository.save(entry);
    }

    // Fetch all entries for a user
    public List<JournalEntry> getUserEntries(User user) {
        return journalEntryRepository.findByUser(user);
    }

    // Fetch entry by ID (ensure ownership)
    public Optional<JournalEntry> getEntryById(User user, UUID entryId) {
        Optional<JournalEntry> entry = journalEntryRepository.findById(entryId);
        if (entry.isPresent() && entry.get().getUser().getId().equals(user.getId())) {
            return entry;
        }
        return Optional.empty();
    }

    // Update an entry
    public JournalEntry updateEntry(User user, UUID entryId, String title, String content, String moodEmoji, String moodLabel, LocalDate entryDate) {
        Optional<JournalEntry> optionalEntry = getEntryById(user, entryId);
        if (optionalEntry.isEmpty()) {
            throw new RuntimeException("Entry not found or unauthorized");
        }
        JournalEntry entry = optionalEntry.get();
        if (title != null) entry.setTitle(title);
        if (content != null) {
            entry.setContent(content);
            entry.setWordCount(content.split("\\s+").length);
        }
        if (moodEmoji != null) entry.setMoodEmoji(moodEmoji);
        if (moodLabel != null) entry.setMoodLabel(moodLabel);
        if (entryDate != null) entry.setEntryDate(entryDate);

        return journalEntryRepository.save(entry);
    }

    // Delete an entry (hard delete)
    public void deleteEntry(User user, UUID entryId) {
        Optional<JournalEntry> optionalEntry = getEntryById(user, entryId);
        if (optionalEntry.isEmpty()) {
            throw new RuntimeException("Entry not found or unauthorized");
        }
        journalEntryRepository.delete(optionalEntry.get());
    }
}
