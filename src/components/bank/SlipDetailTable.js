
const SlipDetailTable = ({children}) => {

    return(
        <div>
            <table className="table detailsliptable table-bordered">
                <thead>
                    <tr>
                    <th scope="col" className="tabletop">
                        구분
                    </th>
                    <th colSpan="2" scope="col" className="tabletop">
                        계정과목
                    </th>
                    <th scope="col" className="tabletop">
                        차변
                    </th>
                    <th scope="col" className="tabletop">
                        대변
                    </th>
                    <th scope="col" className="tabletop">
                        거래처명
                    </th>
                    <th scope="col" className="tabletop">
                        적요
                    </th>
                    </tr>
                </thead>
                <tbody>
                  {children}
                </tbody>
            </table>
        </div>
    );
}

export default SlipDetailTable;