package com.movie.Gemflix.service;

import com.movie.Gemflix.common.CommonResponse;
import com.movie.Gemflix.common.Constant;
import com.movie.Gemflix.common.ErrorType;
import com.movie.Gemflix.dto.product.CategoryDto;
import com.movie.Gemflix.dto.product.ProductDto;
import com.movie.Gemflix.entity.Product;
import com.movie.Gemflix.repository.product.ProductRepository;
import com.movie.Gemflix.repository.product.ProductRepositorySupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final CommonService commonService;
    private final ProductRepository productRepository;
    private final ProductRepositorySupport productRepositorySupport;
    private final ModelMapper modelMapper;

    @Transactional
    public CommonResponse createProduct(ProductDto productDto) throws Exception{

        //파일 확장자 검사
        MultipartFile file = productDto.getMultiPartFile();
        if(!commonService.checkFile(file, Constant.FileExtension.JPG_AND_PNG)){
            return new CommonResponse(ErrorType.INVALID_EXTENSION.getErrorCode(),
                    ErrorType.INVALID_EXTENSION.getErrorMessage());
        }
        //파일 업로드
        String imgLocation = commonService.uploadFile(file, Constant.FilePath.PATH_STORE + productDto.getMemberId() + "/");
        if(imgLocation == null){
            return new CommonResponse(ErrorType.STORE_FAILED_TO_UPLOAD_FILE.getErrorCode(),
                    ErrorType.STORE_FAILED_TO_UPLOAD_FILE.getErrorMessage());
        }
        //상품 등록
        String status = productDto.getStatus();
        switch (status){
            case "Y":
                productDto.setStatus(Constant.BooleanStringValue.TRUE);
                break;
            case "N":
                productDto.setStatus(Constant.BooleanStringValue.FALSE);
                break;
        }
        productDto.setImgLocation(imgLocation);
        productDto.setDelStatus(Constant.BooleanStringValue.FALSE);

        //setting category
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCgId(productDto.getCgId());
        categoryDto.setCgName(productDto.getCgName());
        productDto.setCategory(categoryDto);

        //setting product
        Product product = modelMapper.map(productDto, Product.class);
        log.info("product: {}", product);
        productRepository.save(product);
        return null;
    }

    @Transactional
    public CommonResponse modifyProduct(ProductDto productDto) throws Exception{

        //파일 확장자 검사
        String imgLocation = null;
        if(productDto.getMultiPartFile() != null){
            MultipartFile file = productDto.getMultiPartFile();
            if(!commonService.checkFile(file, Constant.FileExtension.JPG_AND_PNG)){
                return new CommonResponse(ErrorType.INVALID_EXTENSION.getErrorCode(),
                        ErrorType.INVALID_EXTENSION.getErrorMessage());
            }
            //파일 업로드
            imgLocation = commonService.uploadFile(file, Constant.FilePath.PATH_STORE + productDto.getMemberId() + "/");
            if(imgLocation == null){
                return new CommonResponse(ErrorType.STORE_FAILED_TO_UPLOAD_FILE.getErrorCode(),
                        ErrorType.STORE_FAILED_TO_UPLOAD_FILE.getErrorMessage());
            }
        }
        //상품 수정
        String status = productDto.getStatus();
        switch (status){
            case "Y":
                productDto.setStatus(Constant.BooleanStringValue.TRUE);
                break;
            case "N":
                productDto.setStatus(Constant.BooleanStringValue.FALSE);
                break;
        }
        productDto.setImgLocation(imgLocation);

        //setting category
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCgId(productDto.getCgId());
        categoryDto.setCgName(productDto.getCgName());
        productDto.setCategory(categoryDto);

        //setting product
        Product product = modelMapper.map(productDto, Product.class);
        log.info("product: {}", product);
        productRepositorySupport.modifyProduct(product);
        return null;
    }

    @Transactional
    public void deleteProduct(Long prId) {
        productRepositorySupport.deleteProduct(prId);
    }

    public List<ProductDto> getProducts() throws Exception{

        List<Product> products = productRepositorySupport.findByStatusAndDelStatusProductAndCategory("1");
        if(products.size() == 0) return null;

        List<ProductDto> productDtos = products.stream()
                .map(product -> {
                    ProductDto productDTO = modelMapper.map(product, ProductDto.class);
                    String location = productDTO.getImgLocation();

                    try {
                        Resource resource = new FileSystemResource(location);
                        File file = resource.getFile();
                        String base64 = commonService.fileToString(file);
                        productDTO.setBase64(base64);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return productDTO;
                }).collect(Collectors.toList());
        return productDtos;
    }





}