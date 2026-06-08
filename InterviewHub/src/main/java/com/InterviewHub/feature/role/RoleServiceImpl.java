package com.InterviewHub.feature.role;

import com.InterviewHub.exception.InvalidRequestException;
import com.InterviewHub.exception.ResourceNotFoundException;
import com.InterviewHub.feature.role.dto.CreateRoleRequest;
import com.InterviewHub.feature.role.dto.RoleResponse;
import com.InterviewHub.feature.role.dto.UpdateRoleRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public RoleResponse createRole(CreateRoleRequest request) {
        if (roleRepository.existsByNameIgnoreCase(request.name())) {
            throw new InvalidRequestException("Role name already exists");
        }
        Role role = new Role(request.name().toUpperCase());
        Role savedRole = roleRepository.save(role);
        return RoleResponse.fromEntity(savedRole);
    }

    @Override
    public RoleResponse getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id));
        return RoleResponse.fromEntity(role);
    }

    @Override
    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(RoleResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional
    public RoleResponse updateRole(Long id, UpdateRoleRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", id));

        if (!role.getName().equalsIgnoreCase(request.name()) &&
            roleRepository.existsByNameIgnoreCase(request.name())) {
            throw new InvalidRequestException("Role name already exists");
        }

        role.setName(request.name().toUpperCase());
        Role updatedRole = roleRepository.save(role);
        return RoleResponse.fromEntity(updatedRole);
    }

    @Override
    @Transactional
    public void deleteRole(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Role", "id", id);
        }
        roleRepository.deleteById(id);
    }
}
