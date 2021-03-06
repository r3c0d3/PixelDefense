
game.Menu.slow_button = me.GUI_Object.extend({
    init: function(x, y, settings){
        settings.image = "slow_icons";

        settings.frameheight = 32;
        settings.framewidth = 32;
        settings.width = 64;
        settings.height = 32;

        this._super(me.GUI_Object, 'init', [x, y, settings]);
        this.cost = SLOW_TOWER_COST;

        this.addAnimation("slow", [0]);
        this.addAnimation("slow_confirm", [1]);        
        this.setCurrentAnimation("slow");
        this.confirm = false;

        this.anchorPoint.set(0.0, 0.0);
        this.setOpacity(0.75);
        this.pos.z = 500;
        this.parentMenu = settings.parentMenu;
        this.name = "tower_menu_object";
        this.towerEntity = settings.towerEntity;

        //display cost of current tower or upgrade
        me.game.world.addChild(new game.Menu.CostDisplay(this.pos.x, this.pos.y, this.cost), Infinity);

        
    },
    onOver: function(e){
        if(game.data.gold >= SLOW_TOWER_COST){
            this.setOpacity(1.0);
        }

        var atkRadObj = me.game.world.getChildByProp("tag", "attackRadius");
        for(i = 0; i < atkRadObj.length; i++){
            me.game.world.removeChild(atkRadObj[i]);            
        }
        me.game.world.addChild(new game.Menu.AttackRadius(this.towerEntity.pos.x, 
            this.towerEntity.pos.y, SLOW_TOWER_RADIUS), Infinity);
    },
    onOut: function(e){
        this.setOpacity(0.75);
        this.confirm = false;

        var atkRadObj = me.game.world.getChildByProp("tag", "attackRadius");
        for(i = 0; i < atkRadObj.length; i++){
            me.game.world.removeChild(atkRadObj[i]);            
        }

    },
    onClick(e){ 

        if(game.data.gold >= SLOW_TOWER_COST && this.confirm == false){
            this.confirm = true;
        }else if(game.data.gold >= SLOW_TOWER_COST && this.confirm == true){
            this.towerEntity.towerPlaced = true;
            me.audio.play("tower_drop");
            game.data.gold -= SLOW_TOWER_COST;

            //Place slow tower on map
            this.towerEntity.currentTower = me.game.world.addChild(
                new game.SlowTowerEntity(this.parentMenu.pos.x, this.parentMenu.pos.y, 
                {width: this.width, height: this.height}));

            //Remove menu and buttons
            game.functions.removeTowerMenu();        

        }
    },
    update: function(dt){
        if(this.confirm == true){
            this.setCurrentAnimation("slow_confirm");
        }
        else{
            this.setCurrentAnimation("slow");
        }
    },

});

game.Menu.slow_damage_button = me.GUI_Object.extend({
    init: function(x, y, settings){
        settings.image = "slow_damage_icons"; 
        settings.frameheight = 32;
        settings.framewidth = 32;
        settings.width = 64;
        settings.height = 32;

        this._super(me.GUI_Object, 'init', [x, y, settings]);

        this.addAnimation("slow_damage", [0]);
        this.addAnimation("slow_damage_confirm", [1]);        
        this.setCurrentAnimation("slow_damage");
        //set true if icon was initially clicked once and needs
        //to be clicked again to confirm
        this.confirm = false;

        this.anchorPoint.set(0.0, 0.0);
        this.setOpacity(0.75);
        this.pos.z = 500;
        this.parentMenu = settings.parentMenu;
        this.name = "tower_menu_object";
        this.towerEntity = settings.towerEntity;

        //Set this to the index that corresponds to the upgrade number in the slow tower file
        this.upgradeIndex = 0;
        //Cost for this upgrade
        this.upgradeCost = SLOW_TOWER_COST*game.data.upgradeCostFactor[this.towerEntity.currentTower.upgradeLevel];
        //Flag if this upgrade has been installed already
        this.upgradedAlready = this.towerEntity.currentTower.upgradesInstalled[this.upgradeIndex];

        //display cost of current tower or upgrade
        me.game.world.addChild(new game.Menu.CostDisplay(this.pos.x, this.pos.y, this.upgradeCost), Infinity);

        
    },
    onOver: function(e){       
        if(game.data.gold >= this.upgradeCost && !this.upgradedAlready){
            this.setOpacity(1.0);
        }
    },
    onOut: function(e){
        this.setOpacity(0.75);
        this.confirm = false;
    },
    onClick(e){     
        if(game.data.gold >= this.upgradeCost && !this.upgradedAlready && this.confirm == false){
            this.confirm = true;
        }
        else if(game.data.gold >= this.upgradeCost && !this.upgradedAlready && this.confirm == true){
            //Upgrade tower       
            me.audio.play("upgrade");
            game.data.gold -= this.upgradeCost;
            this.towerEntity.currentTower.upgrade(this.upgradeIndex);

            //Remove menu and buttons
            game.functions.removeTowerMenu();        

        }
    },
    update: function(dt){
        if(this.confirm == true){
            this.setCurrentAnimation("slow_damage_confirm");
        }
        else{
            this.setCurrentAnimation("slow_damage");
        }
    },

});

game.Menu.slow_slower_button = me.GUI_Object.extend({
    init: function(x, y, settings){
        settings.image = "slow_slower_icons"; 
        settings.frameheight = 32;
        settings.framewidth = 32;
        settings.width = 64;
        settings.height = 32;

        this._super(me.GUI_Object, 'init', [x, y, settings]);

        this.addAnimation("slow_slower", [0]);
        this.addAnimation("slow_slower_confirm", [1]);        
        this.setCurrentAnimation("slow_slower");
        //set true if icon was initially clicked once and needs
        //to be clicked again to confirm
        this.confirm = false;

        this.anchorPoint.set(0.0, 0.0);
        this.setOpacity(0.75);
        this.pos.z = 500;
        this.parentMenu = settings.parentMenu;
        this.name = "tower_menu_object";
        this.towerEntity = settings.towerEntity;

        //Set this to the index that corresponds to the upgrade number in the slow tower file
        this.upgradeIndex = 1;
        //Cost for this upgrade
        this.upgradeCost = SLOW_TOWER_COST * game.data.upgradeCostFactor[this.towerEntity.currentTower.upgradeLevel];
        //Flag if this upgrade has been installed already
        this.upgradedAlready = this.towerEntity.currentTower.upgradesInstalled[this.upgradeIndex];

        //display cost of current tower or upgrade
        me.game.world.addChild(new game.Menu.CostDisplay(this.pos.x, this.pos.y, this.upgradeCost), Infinity);

        
    },
    onOver: function(e){
       
        if(game.data.gold >= this.upgradeCost && !this.upgradedAlready){
            this.setOpacity(1.0);
        }
    },
    onOut: function(e){
        this.setOpacity(0.75);
        this.confirm = false;
    },
    onClick(e){     
        if(game.data.gold >= this.upgradeCost && !this.upgradedAlready && this.confirm == false){
            this.confirm = true;
        }
        else if(game.data.gold >= this.upgradeCost && !this.upgradedAlready && this.confirm == true){
            //Upgrade tower
            
            me.audio.play("upgrade");
            game.data.gold -= this.upgradeCost;
            this.towerEntity.currentTower.upgrade(this.upgradeIndex);

            //Remove menu and buttons
            game.functions.removeTowerMenu();        

        }
    },
    update: function(dt){
        if(this.confirm == true){
            this.setCurrentAnimation("slow_slower_confirm");
        }
        else{
            this.setCurrentAnimation("slow_slower");
        }
    },

});