package com.InterviewHub.feature.role;

import com.InterviewHub.feature.role.dto.CreateRoleRequest;
import com.InterviewHub.feature.role.dto.RoleResponse;
import com.InterviewHub.feature.role.dto.UpdateRoleRequest;

import java.util.List;

public interface RoleService {
    RoleResponse createRole(CreateRoleRequest request);
    RoleResponse getRoleById(Long id);
    List<RoleResponse> getAllRoles();
    RoleResponse updateRole(Long id, UpdateRoleRequest request);
    void deleteRole(Long id);
}
