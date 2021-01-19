import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import moment from 'moment';
import callApi from '../../libs/utils/api';
import { NoMatch } from '../NoMatch';

const styles = (theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    width: '90%',
    'margin-left': 'auto',
    'margin-right': 'auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    marginLeft: theme.spacing.unit * 2,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  back: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 2,
  },
});

class TraineeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainees: [],
    };
  }

  componentDidMount() {
    this.traineesFromDataBase();
  }

  getTrainee() {
    const { trainees } = this.state;
    const { match: { params: { id } } } = this.props;
    // eslint-disable-next-line no-underscore-dangle
    return trainees.find((item) => item._id === id);
  }

  traineesFromDataBase = async () => {
    await callApi('/trainee', 'GET')
      .then((res) => {
        this.setState({ trainees: res.data.data });
        return res.data.data;
      })
      .catch(() => {
        this.setState({ trainees: [] });
      });
  }

  render() {
    const { classes } = this.props;
    const trainee = this.getTrainee();
    if (!trainee) {
      return <NoMatch />;
    }

    return (
      <>
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image="/images/1200px-Cricket_India_Crest.svg.png"
            title="Live from space album cover"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {trainee.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {moment(trainee.createdAt).format('dddd, MMMM Do, YYYY h:mm:ss A')}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {trainee.email}
              </Typography>
            </CardContent>
          </div>
        </Card>
        <div className={classes.back}>
          <Button component={Link} to="/trainee" variant="contained" color="primary">BACK</Button>
        </div>
      </>
    );
  }
}

TraineeDetails.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(TraineeDetails);
