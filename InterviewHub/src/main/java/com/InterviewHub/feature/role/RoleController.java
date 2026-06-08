package com.InterviewHub.feature.role;

import com.InterviewHub.dto.ApiResponse;
import com.InterviewHub.feature.role.dto.CreateRoleRequest;
import com.InterviewHub.feature.role.dto.RoleResponse;
import com.InterviewHub.feature.role.dto.UpdateRoleRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RoleResponse>> createRole(@RequestBody @Valid CreateRoleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(roleService.createRole(request)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoleResponse>> getRole(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(roleService.getRoleById(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoleResponse>>> getAllRoles() {
        return ResponseEntity.ok(ApiResponse.success(roleService.getAllRoles()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RoleResponse>> updateRole(
            @PathVariable Long id,
            @RequestBody @Valid UpdateRoleRequest request) {
        return ResponseEntity.ok(ApiResponse.success(roleService.updateRole(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
