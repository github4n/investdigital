package com.oxchains.investdigital.entity.strategy.vo;

import com.oxchains.investdigital.entity.User;
import com.oxchains.investdigital.entity.strategy.StrategyComment;
import lombok.Data;

/**
 * Created by xuqi on 2017/12/15.
 */
@Data
public class StrategyCommentInfo extends StrategyComment{
    private String username;
    private String imageUrl;

    public void setStrategyComment(StrategyComment strategyComment){
        this.setContent(strategyComment.getContent());
        this.setId(strategyComment.getId());
        this.setStrategyId(strategyComment.getStrategyId());
        this.setTime(strategyComment.getTime());
        this.setUserId(strategyComment.getUserId());
    }
    public void setUser(User user){
        this.username = user.getLoginname();
        this.imageUrl = user.getImage();
    }

}
