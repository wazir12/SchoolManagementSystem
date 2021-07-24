import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { NavigateNext, PinDropSharp } from '@material-ui/icons';
import PeopleIcon from '@material-ui/icons/People';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const dashBoardData = [
     {
  
       id: 'users',
       url:'https://img.icons8.com/color/200/000000/user-folder.png',
       title: 'Manage Users',
       description: 'Click to Know further...',
     },
     {
      id:'courses',
      url:'https://img.icons8.com/metro/200/000000/book-stack.png',
      title: 'Manage Courses',
      description: 'Click to Know further...',
     },
     
   ];




export default function AdminDashboard (props){
  const classes = useStyles();


  const navigateTo = (id)=>{
    if(id=='users'){
      props.history.push(`/users`);
    }
    else if(id=='courses'){
      props.history.push(`/admin/manageCourses`);
    }
    
  }
  return (
    <div className={classes.root}>
   
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div"> DashBoard </ListSubheader>
        </GridListTile>
        {dashBoardData .map((tile) => (
          <GridListTile key={tile.id} onClick={()=>navigateTo(tile.id)}  background>
             <img src={tile.url}/>
            <GridListTileBar
              title={tile.title}
            
              actionIcon={
                <IconButton  aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

}