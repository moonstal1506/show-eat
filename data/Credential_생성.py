import csv
from faker import Faker
import uuid

# 더미 데이터 생성을 위한 Faker 객체 생성 (한국어로 설정)
fake = Faker('ko_KR')

# 생성할 더미 데이터 수
num_records = 100

# 더미 데이터 생성 및 CSV 파일로 저장
with open('credential.csv', 'w', newline='', encoding='cp949') as csvfile:
    fieldnames = ['credential_id', 'email', 'credential_social_platform', 'credential_role']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for _ in range(num_records):
        row = {
            'credential_id': str(uuid.uuid4()),
            'email': fake.email(),
            'credential_social_platform': "kakao",
            'credential_role': "ADMIN",
        }
        writer.writerow(row)

print("Cretential 생성 및 CSV 파일 저장 완료.")