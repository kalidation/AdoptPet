import { combineReducers } from "redux"
import AuthReducer from "./Auth/Auth.Reducer"
import DarkThemeReducer from "./DarkTheme/DarkTheme.Reducer"
import FirstLunchReducer from "./FirstLunch/FirstLunch.Reducer"
import PetsReducer from "./PetsReducer/Pets.Reducer"
import SavedPetReducer from "./PetSaved/Reducer"


export default combineReducers({
    firstLunchReducer: FirstLunchReducer,
    authReducer: AuthReducer,
    darkThemeReducer: DarkThemeReducer,
    petsReducer: PetsReducer,
    savedPetReducer: SavedPetReducer,
})