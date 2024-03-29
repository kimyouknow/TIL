# IP주소, MAC 주소,ARP,RARP

## IP주소는 IP(Internet Protocol)과 다르다.

- IP(Internet Protocol)는 계층으로 말하자면 `네트워크층`에 해당한다.
- 인터넷을 활용하는 거의 대부분의 시스템이 IP를 이용한다.
- TCP/IP에서의 IP
- `IP의 역할`: 개개의 패킷을 상대방에게 전달하는 것
  - 전달하기 위해서 필요한 여러 요소 중 IP주소와 MAC 주소가 중요하다.

## IP주소(Internet Protocol Address)란?

- 논리적 주소
- 컴퓨터 네트워크에서 장치들이 서로를 인식하고 통신 하기 위해 사용하는 특수한 번호

## MAC(Media Access Control Address) 주소란?

- 네트워크 인터페이스에 할당된 고유 식별자
- 보통 장치의 NIC에 할당

## IP주소와 MAC 주소를 둘 다 사용해야 하는 이유

- IP 주소와 MAC 주소를 사용하는 계층이 다르다.

  - IP 주소는 Network layer에서 사용
  - MAC 주소는 Data Link layer에서 사용
  - 계층을 나눠서 독립적인 프로토콜 사용 가능

- 통신할 때 IP 주소 외에 MAC 주소가 필요한 이유는?

  - 내가 미국에서 서울에 살고 있는 친구의 컴퓨터와 통신을 한다고 가정
  - 친구가 알려준 IP 주소가 그 친구의 컴퓨터라는 사실을 보증할 수 없다.
  - 유동 IP의 특징으로 인해 IP 자체가 변동될 수 있기 때문
  - 절대 변하지 않는 하드웨어의 고유 주소 번호가 필요한데, 그것이 바로 MAC 주소다.

- 통신할 때 MAC 주소 외에 IP 주소가 필요한 이유는?
  - MAC 주소는 데이터 링크 계층 프로토콜이므로 통신할 상대방이 나와 가까운 곳에 있다면 괜찮지만, 한국에서 미국에 있는 A 컴퓨터에 데이터가 가기 위해서는 나와 연결된 어떤 컴퓨터에 데이터를 넘겨야 하는지 MAC 주소로 판단하기 어렵다.
  - 이를 해결하기 위해 IP 주소가 필요하다. IP 주소는 전체적인 맵을 보고 방향성을 알려주는 역할을 한다고 생각하면 된다. (forwarding: 데이터가 여러 스위치를 거쳐 도착지로 도달)
  - IP 주소는 네트워크 주소와 호스트 주소로 나뉘므로 실생활에서 우편물이나 택배를 보낼 때 사용하는 계층형 주소 원리와 유사하기 때문이다.

## IP주소와 MAC 주소비교

| 비교 대상 | 맥 주소                                    | IP 주소                                                             |
| --------- | ------------------------------------------ | ------------------------------------------------------------------- |
| 전체양식  | 미디어 액세스 제어 주소.                   | 인터넷 프로토콜 주소                                                |
| 목적      | 인터넷상의 컴퓨터의 실제 주소를 식별       | 인터넷에서 컴퓨터의 연결을 식별                                     |
| 비트      | 48 비트 (6 바이트) 16 진수 주소            | IPv4는 32 비트 (4 바이트) 주소이고 IPv6은 128 비트 (16 바이트) 주소 |
| 주소      | MAC 주소는 NIC 카드 제조업체가 지정        | IP 주소는 네트워크 관리자 또는 인터넷 서비스 공급자가 할당          |
| 주소 검색 | ARP 프로토콜은 장치의 MAC 주소를 검색 가능 | RARP 프로토콜은 장치의 IP 주소를 검색 가능                          |

## ARP와 RARP

ARP

- 논리적 주소인 IP주소를 물리적 주소인 MAC 주소로 변환

RARP

- 물리적 주소인 MAC 주소를 논리적 주소인 IP주소로 변환

## 참고 자료

- https://terms.naver.com/entry.naver?docId=3571314&cid=59088&categoryId=59096
- https://github.com/alstjgg/cs-study/blob/main/네트워크/IP%20%26%20MAC.md#ip-주소-vs-mac-주소
- 면접을 위한 CS 전공지식 노트 - 주홍철
- 그림으로 배우는 http & network - 우에노 센  저 / 이병억  역
