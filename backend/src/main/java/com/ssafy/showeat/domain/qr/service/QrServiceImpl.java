package com.ssafy.showeat.domain.qr.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class QrServiceImpl implements QrService {

	@Override
	public void qrToCoupon(Long couponId) throws WriterException, IOException {
		// QR 정보
		int width = 200;
		int height = 200;
		String url = "/" + couponId; // TODO: QR코드를 통해 이동할 url 지정 => 쿠폰ID를 통한 해당 쿠폰 사용 페이지
		log.info(url);

		// QR Code - BitMatrix: qr code 정보 생성
		BitMatrix encode = new MultiFormatWriter()
			.encode(url, BarcodeFormat.QR_CODE, width, height);

		// QR Code - Image 생성. : 1회성으로 생성해야 하기 때문에
		// stream으로 Generate(1회성이 아니면 File로 작성 가능.)
		try {
			//output Stream
			ByteArrayOutputStream out = new ByteArrayOutputStream();

			//Bitmatrix, file.format, outputStream
			MatrixToImageWriter.writeToStream(encode, "PNG", out);


			return ResponseEntity.ok()
				.contentType(MediaType.IMAGE_PNG)
				.body(out.toByteArray());

		} catch (Exception e) {
			log.warn("QR Code OutputStream 도중 Excpetion 발생, {}", e.getMessage());
		}
	}
}
