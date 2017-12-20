package com.oxchains.investdigital.entity.strategy.vo;

import com.oxchains.investdigital.entity.strategy.Sectors;
import lombok.Data;

import java.util.List;

/**
 * Created by xuqi on 2017/12/15.
 */
@Data
public class PlateInfo {
    private Long strategyId;
    private List<Sectors> sectorsList;
}
