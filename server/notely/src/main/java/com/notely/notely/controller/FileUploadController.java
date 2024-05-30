package com.notely.notely.controller;

import com.notely.notely.service.FileUpload;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class FileUploadController {

    private final FileUpload fileUpload;

    @RequestMapping("/")
    public String home(){
        return "home";
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("image") MultipartFile multipartFile,
                             Model model) throws IOException {
        String imageURL;
        try {
            imageURL = fileUpload.uploadFile(multipartFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        model.addAttribute("imageURL",imageURL);
        return "gallery";
    }
}
