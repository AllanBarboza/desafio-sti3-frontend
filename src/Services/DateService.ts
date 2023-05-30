const diasMes = (mes: any, ano: any) => {
    var dias_meses = [31, 28, 31, 30, 31, 30, 31,
        31, 30, 31, 30, 31];

    var quant_dias = dias_meses[mes - 1];

    return quant_dias;
}
const DateService = {
    isValidDate(date: string) {
        var partes: Array<any> = date.split("/");
        var dia = parseInt(partes[0]);
        var mes = parseInt(partes[1]);
        var ano = parseInt(partes[2]);
        var valida = true;
        if ((mes < 1) || (mes > 12)) {
            valida = false;
        }
        else if ((ano < 1970) || (ano > 3000)) {
            valida = false;
        }
        else if ((dia < 0) || (dia > diasMes(mes, ano))) {
            valida = false;
        }
        return valida
    },

    FormatStringDate(data: string) {
        var dia = data.split("/")[0];
        var mes = data.split("/")[1];
        var ano = data.split("/")[2];

        return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
    },
    maskDate(value: string) {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1");
    }

}
export default DateService;