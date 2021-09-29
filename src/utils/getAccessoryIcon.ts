import AccelerationSvg from "../assets/acceleration.svg";
import EnergySvg from "../assets/energy.svg";
import ExchangeSvg from "../assets/exchange.svg";
import GasolineSvg from "../assets/gasoline.svg";
import ForceSvg from "../assets/force.svg";
import SpeedSvg from "../assets/speed.svg";
import HybridSvg from "../assets/hybrid.svg";
import PeopleSvg from "../assets/people.svg";
import CarSvg from "../assets/car.svg";

export function getAccessoryIcon(type: string) {
  switch (type) {
    case "acceleration":
      return AccelerationSvg;
    case "electric_motor":
      return EnergySvg;
    case "exchange":
      return ExchangeSvg;
    case "gasoline_motor":
      return GasolineSvg;
    case "force":
      return ForceSvg;
    case "speed":
      return SpeedSvg;
    case "hybrid_motor":
      return HybridSvg;
    case "people":
      return PeopleSvg;
    default:
      return CarSvg;
  }
}
