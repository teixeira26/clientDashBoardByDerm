import React from 'react'
import { OPTION_FOUR, OPTION_ONE, OPTION_TREE, OPTION_TWO } from '../constants/dashboardMenus';
import VisitsGraphic from './VisitsGraphic';
import RecipesGraphic from './recipesGraphic';
import DcPointsGraphic from './dcPointsGraphic';
import TransfersGraphic from './transfersGraphic';

export default function GraphicsFactory({type}) {

    switch (type) {
        case OPTION_ONE:
            return <VisitsGraphic/>
        case OPTION_TWO:
            return <RecipesGraphic/>
            case OPTION_TREE:
            return <DcPointsGraphic/>
            case OPTION_FOUR:
            return <TransfersGraphic/>
        default:
            break;
    }
  
}
