package com.example.jobTracker.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name = "webuser"
)
public class User implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;

    private String password;
    private String firstName;
    private String lastName;

    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id" , nullable = false)
    private List<JobStatus> jobStatuses;

    public User(String u, String e, String p, String f , String l) {
        this.username = u;
        this.email = e;
        this.lastName = l;
        this.firstName = f;
        this.password = p;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
