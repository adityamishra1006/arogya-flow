package com.arogya.flow.controller;

import com.arogya.flow.service.SimulationService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulation")
@RequiredArgsConstructor
public class SimulationController {
    private final SimulationService simulationService;

    @PostMapping("/slots/{slotId}/delay")
    public ResponseEntity<String> simulateDelay(
            @PathVariable Long slotId,
            @RequestParam int delayMinutes
    ){
        simulationService.simulateDelay(slotId, delayMinutes);
        return ResponseEntity.ok("Delay of " + delayMinutes + " minutes applied to slot " + slotId);
    }

    @PostMapping("/slots/{slotId}/emergency")
    public ResponseEntity<String> triggerEmergency(@PathVariable Long slotId){
        simulationService.triggerEmergency(slotId);
        return ResponseEntity.ok("Emergency triggered for slot " + slotId);
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetSimulation(){
        simulationService.resetSimulation();
        return ResponseEntity.ok("OPD Simulation reset successfully");
    }

    @PostMapping("/slots/close-expired")
    public ResponseEntity<String> closeExpiredSlots(){
        simulationService.closeExpiredSlots();
        return ResponseEntity.ok("Expired slots closed successfully");
    }

}
