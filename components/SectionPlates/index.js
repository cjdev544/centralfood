import { Grid } from "semantic-ui-react";
import PlateBox from "../PlateBox";

const SectionPlates = ({ plates }) => {
  return (
    <Grid className="secction-plates">
      {plates?.map((plate) => {
        if (!plate || !plate?.disponible) return null;

        return (
          <Grid.Column key={plate.id} mobile={16} tablet={8} computer={4}>
            <PlateBox plate={plate} />
          </Grid.Column>
        );
      })}
    </Grid>
  );
};

export default SectionPlates;
