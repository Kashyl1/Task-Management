package com.example.taskmanager.user;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AmazonS3 amazonS3;
    @Value("${aws.s3.bucket_name}")
    private String bucketName;

    public String uploadProfileImage(String email, MultipartFile file) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (user.getProfileImageUrl() != null && !user.getProfileImageUrl().isEmpty()) {
            String oldFileName = user.getProfileImageUrl().substring(user.getProfileImageUrl().lastIndexOf("/") + 1);
            amazonS3.deleteObject(bucketName, oldFileName);
        }

        String fileUrl = uploadFileToS3Bucket(file, bucketName);
        user.setProfileImageUrl(fileUrl);
        userRepository.save(user);

        return fileUrl;
    }

    private String uploadFileToS3Bucket(MultipartFile file, String bucketName) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3.getUrl(bucketName, fileName).toString();
    }

    public void deleteProfileImage(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (user.getProfileImageUrl() != null && !user.getProfileImageUrl().isEmpty()) {
            String fileName = user.getProfileImageUrl().substring(user.getProfileImageUrl().lastIndexOf("/") + 1);
            amazonS3.deleteObject(bucketName, fileName);
            user.setProfileImageUrl(null);
            userRepository.save(user);
        }
    }

}
