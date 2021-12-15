import { Component } from "react";
import "./App.css";
import villagerData from "./data";

class App extends Component {
  constructor() {
    super();

    this.state = {
      villagerData: {},
      villagers: [],
      currentVillager: villagerData.ant00,
      showVillage: true,
    };
  }

  changeVillager = () => {
    //// Change Villager
    ////   1. read villagerData, meaning:
    ///       deconstruct villagerData from state
    ///       store its length
    const { villagerData } = this.state;
    const numVillagers = Object.keys(this.state.villagerData).length;

    ////      this.setState({currentVillager: someRandomVillagerObj})
    // get a random object in the Object.values(villagerData) array
    const randomI = Math.floor(Math.random() * numVillagers);
    const randomVillager = Object.values(villagerData)[randomI];
    this.setState({ currentVillager: randomVillager });
  };

  componentDidMount() {
    fetch(" https://acnhapi.com/v1/villagers")
      .then((response) => response.json())
      .then((villagers) => this.setState({ villagerData: villagers }));
  }

  addVillager = () => {
    //// Add Villager to Village
    ////   1. read currentVillager
    ///       deconstruct currentVillager from state
    const { villagers, currentVillager } = this.state;
    ////   2. change villagers, adding the currentVillager
    this.setState({ villagers: [...villagers, currentVillager] });
  };

  clearVillage = () => {
    this.setState({ villagers: [] });
  };

  toggleVillage = () => {
    // if (this.state.showVillage == true) {
    //   this.showVillage({ showVillage: false });
    // } else {
    //   this.setState({ showVillage: true });
    // }
    this.setState({ showVillage: !this.state.showVillage });
  };

  render() {
    const { currentVillager, villagers, showVillage } = this.state;
    // For each villager, make a <p> with the villager's name
    const names = villagers.map((villager) => (
      <p>{villager.name["name-USen"]}</p>
    ));
    return (
      <div className="App">
        <h1>Animal Crossing Villagers</h1>
        <div>
          <button onClick={this.changeVillager}>Change villager</button>
          <button onClick={this.addVillager}>Add villager to village</button>
          <button onClick={this.clearVillage}>Clear Village</button>
          <div>
            Currently selected villager:
            {currentVillager.name["name-USen"]}
          </div>
          <div>
            Number of villagers in village:
            {villagers.length ? villagers.length : "None yet"}
          </div>
          <button onClick={this.toggleVillage}>Show / Hide village</button>
          <div className="villager-grid">{showVillage && names}</div>
        </div>
      </div>
    );
  }
}

export default App;
