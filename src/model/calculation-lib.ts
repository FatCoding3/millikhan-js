export const calculateCharges = (
  velocity1: number,
  velocity2: number,
  electronicIntensity: number
) => {
  const PI: number = 3.14159
  const GRAVITY: number = 9.807
  const VISCOSITY: number = 1.849e-5
  const OIL_DENSITY: number = 700
  const AIR_DENSITY: number = 1.293

  let Fg = 9 * (2**0.5) * PI * (VISCOSITY * -velocity1) ** 1.5
  Fg = Fg/((OIL_DENSITY - AIR_DENSITY) * GRAVITY)**0.5

  const Fe = Fg * (1 - velocity2/velocity1)
  return Fe/electronicIntensity
}