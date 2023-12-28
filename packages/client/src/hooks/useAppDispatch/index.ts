import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/types'

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
