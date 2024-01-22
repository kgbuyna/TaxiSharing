import * as React from "react"
import Svg, {Path} from "react-native-svg"
const Location = (props) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#FFC700"
      fillRule="evenodd"
      d="M15 30.001c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15Zm5.17-17.708c0 2.877-2.918 9.792-5.293 9.792-2.374 0-5.291-6.915-5.291-9.792 0-2.876 2.415-5.208 5.291-5.208 2.877 0 5.292 2.332 5.292 5.208Zm-2.67.208a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Location