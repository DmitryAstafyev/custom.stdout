export interface IProgress {
    update: (value: number) => void;
    tick: (value?: number) => number;
}

export interface IProgressOptions {
    caption?: string;
    value?: number;
    closable?: boolean;
    width?: number;
}

export interface IProgressOptionsInt {
    caption: string;
    value: number;
    closable: boolean;
    width?: number;
}

export class Progress implements IProgress {

    private _id: string;
    private _options: IProgressOptionsInt;
    private _updateCallback: () => void;
    private _doneCallback: () => void;

    constructor(id: string, options: IProgressOptions | undefined, updateCallback: () => void, doneCallback: () => void) {
        this._id = id;
        this._options = this._getOptions(options);
        this._updateCallback = updateCallback;
        this._doneCallback = doneCallback;
        this._validate();
    }

    public update(value: number) {
        this._options.value = value;
        this._validate();
        this._emit();
    }

    public tick(value: number = 1): number {
        this._options.value += value;
        this._validate();
        this._emit();
        return this._options.value;
    }

    public done() {
        this._options.value = 100;
        this._emit();
    }

    public render(width: number): string {
        const maxCaptionWidth: number = Math.ceil(width / 2);
        width = this._getWidth(width);
        let output: string = '';
        output += `${this._options.caption !== '' ? '[' : ''}`;
        output += `${this._options.caption.substr(0, maxCaptionWidth)}`;
        output += `${this._options.caption.length > maxCaptionWidth ? '...' : ''}`;
        output += `${this._options.caption !== '' ? ']' : ''}`;
        output += `[${' '.repeat(3 - this._options.value.toString().length)}`;
        output += `${this._options.value}%][`;
        const rate: number = (width - (output.length + 2)) / 100;
        output += '■'.repeat(Math.ceil(this._options.value * rate));
        output += '·'.repeat(Math.ceil((100 - this._options.value) * rate));
        output += ']';
        return output;
    }

    public getOptions(): IProgressOptionsInt {
        return Object.assign({}, this._options);
    }

    private _validate() {
        if (this._options.value > 100) {
            this._options.value = 100;
        }
        if (this._options.value < 0) {
            this._options.value = 0;
        }
        if (isNaN(this._options.value) || !isFinite(this._options.value)) {
            this._options.value = 0;
        }
    }

    private _emit() {
        this._updateCallback();
        if (this._options.value > 100) {
            this._doneCallback();
        }
    }

    private _getOptions(opts: IProgressOptions | undefined): IProgressOptionsInt {
        if (opts === null || typeof opts !== 'object') {
            opts = {};
        }
        opts.value = typeof opts.value !== 'number' ? 0 : opts.value;
        opts.width = opts.width;
        opts.caption = typeof opts.caption !== 'string' ? '' : opts.caption;
        opts.closable = typeof opts.closable !== 'boolean' ? false : opts.closable;
        return opts as IProgressOptionsInt;
    }

    private _getWidth(defWidth: number): number {
        if (typeof this._options.width !== 'number') {
            return defWidth;
        }
        if (isNaN(this._options.width) || !isFinite(this._options.width)) {
            return defWidth;
        }
        return this._options.width;
    }

}
