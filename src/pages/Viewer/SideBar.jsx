import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import StyledContainer from "../../layouts/StyledContainer";
import ChartsContainer, {charts} from "./charts/ChartsContainer";

const SideBar = () => {

    const [chartType, setChartType] = useState(charts[0].type);
    return (


        <div style={{height: "1300px"}}>

            <MainLayout style={{ height: "100vh", width:"100vw", justifyContent: "space-between"}}>
                <StyledContainer variant="DefaultTransparent" style={{margin:"20px"}}>
                    <StyledContainer variant="defaultContained" className="dflxColumn" style={{heigth: "100px", width: "200px"}}>
                        <img src="public/images/ProfilePic.png" height="150px" alt="Profile"/>
                        <div className="user-side-profile" style={{ lineHeight: 0.5 }}>
                            <p color="green"><strong> Viewer logged in! </strong></p>
                            <p>Last Login: 2023-10-01</p>
                            <p >User: AnaMoura</p>

                        </div>
                        <div className="dflxColumn" >
                            {/*<button className="side-bar-button"> Edit profile </button>*/}
                            <button className="side-bar-button"> Loggout </button>
                        </div>

                    </StyledContainer>

                </StyledContainer>
                <StyledContainer variant="DefaultTransparent" style={{marginTop:"20px"}}>
                    <ChartsContainer active={chartType}></ChartsContainer>
                </StyledContainer>
                <div className="graph-buttons" style={{marginRight:"60px", marginTop:"40px"}}>
                    {charts.map((chart, index) => {
                        return <button className="side-bar-button" onClick={() => setChartType(chart.type)}>{chart.name}</button>
                    })}
                    {/*<button className="side-bar-button"> Votos por Partido </button><br/>
                    <button className="side-bar-button"> Resultados Legislativas Globais </button><br/>
                    <button className="side-bar-button"> Lugares Assembleia da República </button><br/>
                    <button className="side-bar-button"> Votos por Partido Por Freguesia </button><br/>
                    <button className="side-bar-button"> Resultados Presidencis Globais </button><br/>
                    <button className="side-bar-button"> Lugares Republica Portugal </button><br/>*/}
                </div>
            </MainLayout>

        </div>

    );
};

export default SideBar;