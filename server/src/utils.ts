import filesystem from 'fs';
import { parse } from 'csv-parse';
import csv from 'csv-parser';

/**
 * Reads data from a CSV file
 * 
 * @param filePath The filepath of the CSV file
 * @returns a Promise, with the data from the CSV file
 */
export async function parseCSVFile(filePath: string): Promise<object[]> {
    const results: object[] = [];

    return new Promise((resolve, reject) => {
        filesystem.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

export async function parseCSV(data: any): Promise<object[]> {
    const results: object[] = [];
    console.log(data);
    const parser = parse(data);

    return new Promise((resolve, reject) => {
        parser
            .on('data', (result: any) => results.push(result))
            .on('end', () => resolve(results))
            .on('error', (error: any) => reject(error));
    });
}