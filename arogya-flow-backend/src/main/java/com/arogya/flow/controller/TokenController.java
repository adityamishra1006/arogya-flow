package com.arogya.flow.controller;

import com.arogya.flow.dto.TokenRequestDTO;
import com.arogya.flow.dto.TokenResponseDTO;
import com.arogya.flow.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tokens")
@RequiredArgsConstructor
public class TokenController {
    private final TokenService tokenService;

    @PostMapping("/book")
    public ResponseEntity<TokenResponseDTO> bookToken(@RequestBody TokenRequestDTO requestDTO){
        TokenResponseDTO response = tokenService.bookToken(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{tokenId}/cancel")
    public ResponseEntity<Void> cancelToken(@PathVariable Long tokenId){
        tokenService.cancelToken(tokenId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{tokenId}/expire")
    public ResponseEntity<Void> expireToken(@PathVariable Long tokenId){
        tokenService.expireToken(tokenId);
        return ResponseEntity.noContent().build();
    }
}
