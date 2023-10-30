package com.ssafy.showeat.domain.funding.repository;

import java.util.Optional;

import javax.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.showeat.domain.funding.entity.Funding;

public interface FundingRepository extends JpaRepository<Funding,Long>, FundingCustomRepository {

	@Lock(value = LockModeType.PESSIMISTIC_WRITE)
	@Query("select f from Funding f where f.fundingId=:fundingId")
	Optional<Funding> findByIdWithLock(@Param("fundingId") Long fundingId);

	@Lock(value = LockModeType.OPTIMISTIC)
	@Query("select f from Funding f where f.fundingId=:fundingId")
	Optional<Funding> findByIdWithOptimisticLock(@Param("fundingId") Long fundingId);

}
